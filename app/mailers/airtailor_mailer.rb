class AirtailorMailer < ApplicationMailer

  def error_email(customer, data, res)
    @customer = customer
    @data = data
    @res = res
    mail(to: "brian@airtailor.com", subject: "D2C ERROR — Customer: " + @customer.first_name + " " + @customer.last_name)
  end

  def success_email(customer, data, res)
    @customer = customer
    @data = data
    @res = res
    mail(to: "brian@airtailor.com, joshua@airtailor.com", subject: "New D2C Order — Customer: " + @customer.first_name + " " + @customer.last_name)
  end

end
