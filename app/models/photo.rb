class Photo < ApplicationRecord
  has_one_attached :image
  has_one_attached :cropped_image
end
