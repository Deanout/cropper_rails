json.extract! photo, :id, :name, :created_at, :updated_at
json.url photo_url(photo, format: :json)
