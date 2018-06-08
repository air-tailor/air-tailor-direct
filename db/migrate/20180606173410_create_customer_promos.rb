class CreateCustomerPromos < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_promos do |t|

      t.integer :customer_id
      t.integer :promo_id

      t.timestamps
    end
  end
end
