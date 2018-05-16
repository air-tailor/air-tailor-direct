class ErrorMailer < ApplicationMailer

  def error_email(customer, res)
    @customer = customer
    @res = res


    mail(to: "brian@airtailor.com", subject: "D2C Error — customer " + customer.id)
  end

end
