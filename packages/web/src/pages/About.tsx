const About = () => {
  return (
    <section>
      <h2>
        <strong>About</strong>
      </h2>
      <br />
      <p>
        This is Authentication demo focused on refresh token functionality and
        same{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
          className="link"
        >
          origin
        </a>{' '}
        tab/window synchronization with{' '}
        <a href="https://github.com/pubkey/broadcast-channel" className="link">
          Broadcast channel
        </a>
        . It auto refreshes jwt token after expiry and keeps jwt tokens in sync
        with all other opened same{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
          className="link"
        >
          origin
        </a>{' '}
        tabs/windows.
      </p>
      <br />
      <ol className="list-decimal list-inside">
        <h3>
          <strong>Future:</strong>
        </h3>
        <li>
          keep react-query cache synced across same origin tabs/windows (just
          like{' '}
          <a
            href="https://react-query.tanstack.com/plugins/broadcastQueryClient#_top"
            className="link"
          >
            react query's broadcastQueryClient
          </a>{' '}
          )
        </li>
      </ol>
    </section>
  );
};

export default About;
