class User < ActiveRecord::Base
  attr_reader :password

  validates :password_digest, :username, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, uniqueness: true

  after_initialize :ensure_session_token

  has_many :products,
    primary_key: :id,
    foreign_key: :hunter_id

  has_many :comments,
    foreign_key: :author_id,
    class_name: "Discussion"

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_is?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = new_session_token
    self.save!
  end

  private
  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.base64
  end
end
