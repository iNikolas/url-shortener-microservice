import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>URL Shortener Microservice</h1>
      <h2>Short URL Creation</h2>
      <p>
        Example: <code>POST [project_url]/api/shorturl</code> -
        <code>https://www.google.com</code>
      </p>
      <main>
        <section>
          <form action="/api/shorturl" method="POST">
            <fieldset>
              <legend>URL Shortener</legend>
              <label htmlFor="url_input">URL:</label>
              <input
                id="url_input"
                type="text"
                name="url"
                placeholder="https://www.freecodecamp.org/"
              />
              <input type="submit" value="POST URL" />
            </fieldset>
          </form>
        </section>
        <h2>Example Usage:</h2>
        <Link href="/api/shorturl/3">[this_project_url]/api/shorturl/3</Link>

        <h3>Will Redirect to:</h3>
        <p>https://forum.freecodecamp.org/</p>
      </main>
      <footer>
        <p>
          By{" "}
          <Link href="https://www.linkedin.com/in/nikolaj-lebed-570438207/">
            Mikola Lebid
          </Link>
        </p>
      </footer>
    </>
  );
}
