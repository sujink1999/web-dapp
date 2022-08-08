class AddEnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :ens_domain, :string
  end
end
