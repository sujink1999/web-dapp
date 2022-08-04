class AddNoteToUserProfileTypeChange < ActiveRecord::Migration[6.1]
  def change
    add_column :user_profile_type_changes, :note, :text
  end
end
