module Quests
  class CompletedTalentProfileNotification < QuestCompletedNotification
    deliver_by :email, mailer: "UserMailer", method: :send_completed_profile_email, delay: 15.minutes, if: :should_deliver_immediate_email?
  end
end
