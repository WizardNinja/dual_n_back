class User < ActiveRecord::Base
  attr_accessible :email, :name, :password, :password_confirmation, :remember_token
  has_secure_password

  has_many :scores

  before_save :create_remember_token

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true
  validates :password, presence: true
  validates :password_confirmation, presence: true, length: {minimum: 6}

  def create_remember_token
  	self.remember_token = SecureRandom.urlsafe_base64
  end
end
