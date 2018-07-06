class AddKitRequestedToCustomers < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :kit_requested, :boolean
  end
end
