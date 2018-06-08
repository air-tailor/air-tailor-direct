class AddUsedToCustomerPromos < ActiveRecord::Migration[5.1]
  def change
    add_column :customer_promos, :used, :boolean
  end
end
