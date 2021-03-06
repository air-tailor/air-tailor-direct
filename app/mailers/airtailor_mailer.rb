class AirtailorMailer < ApplicationMailer

  def error_email(customer, data, notes, res)
    @customer = customer
    @data = data
    @notes = notes
    @res = res
    mail(to: "brian@airtailor.com, joshua@airtailor.com", subject: "D2C ERROR — Customer: " + @customer.first_name + " " + @customer.last_name)
  end

  def success_email(customer, data, res)
    @customer = customer
    @data = data
    @res = res
    mail(to: "brian@airtailor.com, joshua@airtailor.com", subject: "New D2C Order — Customer: " + @customer.first_name + " " + @customer.last_name)
  end

  def order_kit_email(customer)
    @customer = customer
    mail(to: "brian@airtailor.com, joshua@airtailor.com", subject: "Order Kit Request — Customer: " + @customer.first_name + " " + @customer.last_name)
  end

  def forgot_password(customer)
    attachments.inline['logo.png'] = File.read(Rails.root.join("app/assets/images/logo.png"))
    @customer = customer

    mail to: customer.email, :subject => 'Reset Password'
  end

end
