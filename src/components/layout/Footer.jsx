import styles from "./Footer.module.css"

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <footer>
        <div className={styles.icons}>
          <a
            href="https://github.com/pedromorenovillar"
            target="_blank"
            aria-label="GitHub"

          >
            
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
          
          </a>
          <a
            href="https://www.linkedin.com/in/pedromorenovillar"
            target="_blank"
            aria-label="LinkedIn"

          >
            

            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg" />
          
          
          </a>
          <a
            href="mailto:pjmorenovillar@gmail.com"
            aria-label="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
          </a>
        </div>
        <div className={styles.copyright}>{currentYear} &#169; Pedro José Moreno Villar</div>
      </footer>
    </>
  );
}
export default Footer;