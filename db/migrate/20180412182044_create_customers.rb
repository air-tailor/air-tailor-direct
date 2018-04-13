class CreateCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :email
      t.string :street
      t.string :street_two
      t.string :city
      t.string :state_province
      t.string :zip_code
      t.string :password_digest

      t.timestamps
    end
  end
end
