import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="not-found">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/admin/dashboard">
          Return to Dashboard
        </Link>
      </div>

      <style jsx>{`
        .not-found {
          text-align: center;
          padding: 2rem;
          margin-top: 5rem;
        }

        h1 {
          font-size: 6rem;
        }

        h2 {
          margin-bottom: 1rem;
        }

        p {
          margin-bottom: 2rem;
        }

        a {
          color: #0070f3;
          text-decoration: underline;
        }
      `}</style>
    </motion.div>
  );
};

export default NotFound;
