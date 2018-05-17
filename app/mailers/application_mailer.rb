class ApplicationMailer < ActionMailer::Base
  default from: 'orders@airtailor.com'
  layout 'mailer'
end
