##models

#users
-id
-naam/bedrijf
-profielfoto
-email
-professional : true / false
-projects: project_id

#projects
-id
-likes
-titel
-beschrijving
-samenvatting
-groote
-deelnemers: user_id
-comments
-ideeën
-funding
-rollen
-locatie
-foto
-eigenaar: user_id
-status
-updates

#comments
-id
-tekst
-user_id
-project_id
-datum
-idee: true / false

#rollen
-id
-name
-user_id
-project_id

#funding
-naam
-amount
-project_id
-id

#updates
-tekst
-datum
-user_id
-Project_id