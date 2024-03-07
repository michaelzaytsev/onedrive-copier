import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppAuthService } from '../../../auth/auth.service';
import { FileExploreTableItemType } from '../../../components/file-explore-table/file-explore-table.types';
import { oneDriveDriveItemCopyProgressStatuses } from '../../../providers/onedrive/onedrive.consts';
import { OneDriveService } from '../../../providers/onedrive/onedrive.service';
import {
    OneDriveDriveItemCopyProgress,
    OneDriveDriveItemCopyProgressStatus,
} from '../../../providers/onedrive/onedrive.types';
import { wait } from '../../../shared/shared.utils';
import { TasksService } from '../tasks.service';
import { ActiveTask } from '../tasks.types';

@Component({
    selector: 'app-active-task',
    templateUrl: './active-task.component.html',
})
export class ActiveTaskComponent {
    FileExploreTableItemType = FileExploreTableItemType;
    oneDriveDriveItemCopyProgressStatuses = oneDriveDriveItemCopyProgressStatuses;

    constructor(
        private auth: AppAuthService,
        private oneDrive: OneDriveService,
        private tasksService: TasksService,
    ) {
        this.tasksService.activeTask$.subscribe(task => {
            this.task = task;

            if (this.task) {
                if (!this.task.activeSourceItemMonitorLink && !this.copying) {
                    this.copyNextSourceItem();
                }

                if (this.task.activeSourceItemMonitorLink && !this.watching) {
                    this.calculateTotalSizes();
                    this.watchProgress();
                }
            } else {
                this.resetProgress();
            }
        });
    }

    protected task: ActiveTask | null = null;
    protected progress: OneDriveDriveItemCopyProgress | null = null;
    protected sourceItemFilesCopied = 0;
    protected sourceItemTotalFiles = 0;
    protected sourceItemCopiedBytes = 0;
    protected sourceItemTotalBytes = 0;
    protected sourceItemPercentage = 0;
    protected copiedSourceItemsBytes = 0;
    protected totalBytes = 0;
    protected totalPercentage = 0;
    protected bytesPerSecond = 0;
    protected secondsLeft = 0;

    private copying = false;
    private watching = false;

    private copyNextSourceItem(): void {
        this.copying = true;
        this.task!.activeSourceItemIndex++;
        this.tasksService.setActiveTask(this.task!);
        this.auth.getAccessToken$().subscribe(accessToken => {
            const sourceItem = this.task!.sourceItems[this.task!.activeSourceItemIndex];
            this.oneDrive
                .copyDriveItem(
                    sourceItem.driveId,
                    sourceItem.id,
                    this.task!.targetItem.driveId,
                    this.task!.targetItem.id,
                    accessToken,
                )
                .subscribe(monitorLink => {
                    this.task!.activeSourceItemMonitorLink = monitorLink;
                    this.tasksService.setActiveTask(this.task!);
                    this.copying = false;
                    this.calculateTotalSizes();
                    this.watchProgress();
                });
        });
    }

    private async watchProgress(): Promise<void> {
        this.watching = true;
        while (!this.progress || this.progress.status !== OneDriveDriveItemCopyProgressStatus.Completed) {
            try {
                this.progress = await lastValueFrom(
                    this.oneDrive.checkDriveItemCopyProgress(this.task!.activeSourceItemMonitorLink!),
                );
                this.extractSizes();
                this.calculateIndicators();
                await wait(3e3);
            } catch (error: any) {
                if (
                    (error.status === 404 && error.error?.error?.code === 'operationNotFound') ||
                    (error.status === 500 && error.error?.status === 'failed')
                ) {
                    break;
                }
                throw error;
            }
        }
        await wait(1e3);
        this.watching = false;

        if (this.task!.activeSourceItemIndex < this.task!.sourceItems.length - 1) {
            this.task!.activeSourceItemMonitorLink = undefined;
            this.tasksService.setActiveTask(this.task!);
        } else {
            this.tasksService.unsetActiveTaskAndReleaseNextOneIfExists();
        }
    }

    private calculateTotalSizes(): void {
        this.copiedSourceItemsBytes = this.task!.sourceItems.filter(
            (item, index) => index < this.task!.activeSourceItemIndex,
        )
            .map(item => item.size)
            .reduce((sum, size) => sum + size, 0);
        this.totalBytes = this.task!.sourceItems.map(item => item.size).reduce((sum, size) => sum + size, 0);
    }

    private extractSizes(): void {
        if (this.progress) {
            const description = this.progress.statusDescription.match(
                /^Completed ([0-9]+)\/([0-9]+) files; ([0-9]+)\/([0-9]+) bytes$/,
            );
            this.sourceItemFilesCopied = description?.[1] ? +description[1] : 0;
            this.sourceItemTotalFiles = description?.[2] ? +description[2] : 0;
            this.sourceItemCopiedBytes = description?.[3] ? +description[3] : 0;
            this.sourceItemTotalBytes = description?.[4] ? +description[4] : 0;
        }
    }

    private calculateIndicators(): void {
        if (this.progress) {
            this.sourceItemPercentage = Math.floor(this.progress.percentageComplete * 100) / 100;
        }

        const bytesCopied = this.copiedSourceItemsBytes + this.sourceItemCopiedBytes;
        this.totalPercentage = Math.floor((bytesCopied / this.totalBytes) * 1e4) / 100;

        const bytesPerMs = bytesCopied / (Date.now() - this.task!.startedAtMs);
        this.bytesPerSecond = Math.round(bytesPerMs / 1e3);
        this.secondsLeft = Math.round(((this.totalBytes - bytesCopied) * bytesPerMs) / 1e3);
    }

    private resetProgress(): void {
        this.progress = null;
        this.sourceItemFilesCopied = 0;
        this.sourceItemTotalFiles = 0;
        this.sourceItemCopiedBytes = 0;
        this.sourceItemTotalBytes = 0;
        this.sourceItemPercentage = 0;
        this.copiedSourceItemsBytes = 0;
        this.totalBytes = 0;
        this.totalPercentage = 0;
    }
}
