class ErrorMailer < ApplicationMailer

  def error_email(customer, data, res)
    @customer = customer
    @data = data
    @res = res


    mail(to: "brian@airtailor.com", subject: "D2C Error — customer " + customer.id.to_s)
  end

end
