class Customer < ApplicationRecord
  after_save :add_to_list
  has_many :customer_promos
  has_many :promos, :through => :customer_promos

  has_secure_password

  validates :email, uniqueness: true, presence: true
  validates :first_name, :last_name, :street, :city, :state_province, :zip_code,presence: true

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  validates :phone, presence: true, length: { minimum: 10, maximum: 15 }

  validates_format_of :phone, :with => /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

  validates :password, presence: true, length: { minimum: 5 }, :allow_blank => true

  before_save { |customer| customer.email = email.downcase }

  def is_admin?
    # @TODO Make this better.
    self.email == "brian@airtailor.com" || self.email == "joshua@airtailor.com" || self.email == "morgan@airtailor.com"
  end

  def add_to_list
    begin
      list_id = ENV['MAILCHIMP_LIST_ID']
      @gb = Gibbon::Request.new
      subscribe = @gb.lists(list_id).members.create(body: { email_address: self.email, status: "subscribed", merge_fields: {:FNAME => self.first_name, :LNAME => self.last_name}, double_optin: false })
    rescue Gibbon::MailChimpError => e
      return puts e.message
    end
  end

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
