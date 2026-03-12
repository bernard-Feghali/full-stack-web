function AdminLoginPage() {
  return (
    <div className="admin-page admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Sign in to manage cases and messages.</p>

        <form className="admin-login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage