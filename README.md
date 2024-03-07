# onedrive-copier

A Web application that allows to copy files and directories from personal OneDrive drive to shared one and vice versa and watch the progress.

# Getting started

1. Change directory to `./.devops/infrastructure` and apply the Terraform configuration in order to create an Azure application and get its client ID.

2. Change directory to `./src/assets/config` and copy the file `template.config.json` to `dev.config.json` one.
   <br> Replace `<onedrive-copier-ui--client-id>` with the client ID got at the step one (1).
   <br> Replace `<active-ad--tenant-id>` with the tenant ID of you Active Azure Directory.

3. Move to the root directory and run the command `npm start` in order to run the application.
