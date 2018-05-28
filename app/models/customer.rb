class Customer < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true
  validates :first_name, :last_name, :street, :city, :state_province, :zip_code,presence: true

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  validates :password, presence: true, length: { minimum: 5 }, :allow_blank => true

  before_save { |customer| customer.email = email.downcase }

  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save!
    AirtailorMailer.forgot_password(self).deliver# This sends an e-mail with a link for the user to reset the password
  end
  # This generates a random password reset token for the user
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while Customer.exists?(column => self[column])
  end
end
