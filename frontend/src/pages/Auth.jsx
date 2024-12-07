import { useState } from 'react';
import styles from './Auth.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <img src="/snapstore-logo.png" alt="SnapStore Logo" className={styles.logo} />
        <h1 className={styles.title}>{isLogin ? 'Hello' : 'Welcome'}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Name"
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <button className={styles.button} type="submit">
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>
        <div className={styles.divider}>
          <span>Or continue with</span>
        </div>
        <div className={styles.socialLoginContainer}>
          <button className={`${styles.socialButton} ${styles.googleButton}`}>
            <img src="/google-icon.svg" alt="" className={styles.socialIcon} />
            <span>Google</span>
          </button>
          <button className={`${styles.socialButton} ${styles.githubButton}`}>
            <img src="/github-icon.svg" alt="" className={styles.socialIcon} />
            <span>GitHub</span>
          </button>
          <button className={`${styles.socialButton} ${styles.facebookButton}`}>
            <img src="/facebook-icon.svg" alt="" className={styles.socialIcon} />
            <span>Facebook</span>
          </button>
          <button className={`${styles.socialButton} ${styles.microsoftButton}`}>
            <img src="/microsoft-icon.svg" alt="" className={styles.socialIcon} />
            <span>Microsoft</span>
          </button>
        </div>
        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
