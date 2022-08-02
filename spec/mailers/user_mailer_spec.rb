require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  let(:user) { create :user }

  describe "sign up email" do
    let(:mail) { described_class.with(user_id: user.id).send_sign_up_email }

    it "renders the header" do
      expect(mail.subject).to eql("Confirm your email address")
      expect(mail.to).to eql([user.email])
    end

    it "assigns email verify url" do
      expect { confirm_email_url(token: user.email_confirmation_token) }.not_to raise_error
    end
  end

  describe "password reset email" do
    let(:mail) { described_class.with(user: user).send_password_reset_email }

    it "renders the header" do
      expect(mail.subject).to eql("Talent Protocol - Did you forget your password?")
      expect(mail.to).to eql([user.email])
    end

    it "assigns reset password url" do
      expect { url_for([user, :password, action: :edit, token: user.confirmation_token]) }.not_to raise_error
    end
  end

  describe "welcome email" do
    let(:mail) { described_class.with(user: user).send_welcome_email }

    it "renders the header" do
      expect(mail.subject).to eql("Welcome to the home of talented builders")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "token launch email" do
    let(:mail) { described_class.with(user: user).send_token_launched_email }

    it "renders the header" do
      expect(mail.subject).to eql("Congrats, your Talent Token is now live!")
      expect(mail.to).to eql([user.email])
    end

    it "assigns profile url" do
      expect { talent_profile_url(user.username) }.not_to raise_error
    end
  end

  describe "send complete profile reminder email" do
    let(:mail) { described_class.with(user: user).send_complete_profile_reminder_email }

    it "renders the header" do
      expect(mail.subject).to eql("Complete your profile and earn your NFT today! 🚀")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send application received email" do
    let(:mail) { described_class.with(user: user).send_application_received_email }

    it "renders the header" do
      expect(mail.subject).to eql("We've received your application")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send application rejected email" do
    let(:mail) { described_class.with(user: user).send_application_rejected_email }

    it "renders the header" do
      expect(mail.subject).to eql("Your application hasn't been approved")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send application approved email" do
    let(:mail) { described_class.with(user: user).send_application_approved_email }

    it "renders the header" do
      expect(mail.subject).to eql("Hey, you can now launch your token 🚀")
      expect(mail.to).to eql([user.email])
    end
  end
end
