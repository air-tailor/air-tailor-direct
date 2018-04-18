class Customer < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true
  validates :first_name, :last_name, :street, :city, :state_province, :zip_code,presence: true

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  validates :password, presence: true, length: { minimum: 5 }
end
