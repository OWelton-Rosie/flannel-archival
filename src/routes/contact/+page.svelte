<script>
  let sending = false;
  let sent = false;
  let error = false;

  let subject = "";

  const commitHash = import.meta.env.VITE_COMMIT_HASH;

  let browser = "";

  // run on client only
  if (typeof navigator !== "undefined") {
    browser = navigator.userAgent;
  }

  const prompts = {
    general: "Tell us what you'd like to know.",
    content: "Please include the issue name, page number(s), and the reason for the takedown request.",
    correction: "Include the issue name, page number, and what the correct information should be.",
    technical: "Describe the issue. Your browser and site version will be included automatically.",
    other: "Provide as much detail as possible."
  };

  async function handleSubmit(event) {
    event.preventDefault();

    sending = true;
    error = false;

    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xojkdykl", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        sent = true;
        form.reset();
        subject = "";
      } else {
        error = true;
      }
    } catch {
      error = true;
    }

    sending = false;
  }
</script>

<h1>Contact us</h1>

<form on:submit={handleSubmit}>
  <label for="email">Your email</label>
  <input id="email" type="email" name="email" required placeholder="you@example.com" />

  <label for="subject">Subject</label>
  <select id="subject" name="subject" bind:value={subject} required>
    <option value="" disabled>Select a subject</option>
    <option value="general">General enquiry</option>
    <option value="content">File a takedown request</option>
    <option value="correction">Request a correction</option>
    <option value="technical">Technical issue</option>
    <option value="other">Other</option>
  </select>

  {#if subject === "content" || subject === "correction"}
    <label for="issue">Issue name / year (optional)</label>
    <input
      id="issue"
      type="text"
      name="issue"
      placeholder="e.g. Flannel Vol. 12 (1998)"
    />
  {/if}

  <label for="message">Your message</label>
  <textarea
    id="message"
    name="message"
    required
    placeholder="Write your message here..."
  ></textarea>

  {#if prompts[subject]}
    <p class="helper">{prompts[subject]}</p>

    {#if subject === "technical"}
      {#if commitHash}
        <p class="helper technical-meta">
          Version: <code>{commitHash}</code>
        </p>
        <input type="hidden" name="commit" value={commitHash} />
      {/if}

      {#if browser}
        <p class="helper technical-meta">
          Browser: <code>{browser}</code>
        </p>
        <input type="hidden" name="browser" value={browser} />
      {/if}
    {/if}
  {/if}

  <!-- honeypot spam field -->
  <input type="text" name="_gotcha" style="display:none" />

  <button type="submit" disabled={sending}>
    {sending ? "Sending..." : "Send message"}
  </button>

  {#if sent}
    <p class="success">Thanks! Your message has been sent.</p>
  {/if}

  {#if error}
    <p class="error">Something went wrong. Please try again.</p>
  {/if}
</form>

<style>
  form {
    max-width: 520px;
    margin-top: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.7rem;
    margin-bottom: 1.2rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 0.95rem;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background: white;
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #4f46e5;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 2rem;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    background: #4f46e5;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  button:hover {
    background: #4338ca;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success {
    color: #16a34a;
    margin-top: 1rem;
  }

  .error {
    color: #dc2626;
    margin-top: 1rem;
  }

  .helper {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: -0.7rem;
    margin-bottom: 1rem;
  }

  .technical-meta {
    margin-top: -0.4rem;
  }

  code {
    font-family: monospace;
    background: #f3f4f6;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
  }
</style>