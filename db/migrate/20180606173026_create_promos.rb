class CreatePromos < ActiveRecord::Migration[5.1]
  def change
    create_table :promos do |t|
      t.string :name
      t.float :amount
      t.string :type
      t.date :expiration

      t.timestamps
    end
  end
end
