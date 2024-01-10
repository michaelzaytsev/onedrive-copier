resource "azuread_application" "ui" {
  display_name     = "onedrive-copier-ui"
  owners           = [data.azuread_client_config.current.object_id]
  sign_in_audience = "AzureADandPersonalMicrosoftAccount"

  required_resource_access {
    # x-ms-resourceAppName = "Microsoft Graph"
    resource_app_id = "00000003-0000-0000-c000-000000000000"

    resource_access {
      # x-ms-name = "User.Read"
      id   = "e1fe6dd8-ba31-4d61-89e7-88639da4683d"
      type = "Scope"
    }

    resource_access {
      # x-ms-name = "Files.ReadWrite"
      id   = "5c28f0bf-8a70-41f1-8ab2-9032436ddb65"
      type = "Scope"
    }
  }

  api {
    requested_access_token_version = 2
  }

  single_page_application {
    redirect_uris = [
      "http://localhost:4200/"
    ]
  }
}

resource "azuread_service_principal" "ui" {
  client_id = azuread_application.ui.client_id
  owners    = [data.azuread_client_config.current.object_id]
}
