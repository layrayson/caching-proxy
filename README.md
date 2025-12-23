# caching-proxy

A simple HTTP caching reverse proxy server built with Node.js and Express.

## Overview

`caching-proxy` acts as a caching layer in front of your origin server. It efficiently caches GET requests for faster subsequent responses while forwarding other requests to the original backend. This project is designed for learning about HTTP caching, proxies, and middleware in Node.js.

## Features

- Caches GET responses to reduce latency and load on the origin server.
- Supports custom cache TTL (time-to-live).
- Forwards all HTTP methods to the origin if not cached.
- Stores and returns response headers.
- Adds an `X-Cache` header to show cache HIT or MISS.
- Easy to configure and extend.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/caching-proxy.git
   cd caching-proxy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

4. **Link the executable globally (for development/testing):**

   ```bash
   npm link
   ```

5. **Run the caching proxy via CLI:**

   ```bash
   caching-server --origin  http://example.com --port 8080
   ```

   Replace `http://example.com` with your origin server URL, and `8080` with your desired port.

## Usage

Once running, send your API requests to `http://localhost:8080` (or your chosen port). The proxy will forward and cache responses from the specified origin server.

## Project Task

See the full project and learning roadmap at:  
[https://roadmap.sh/projects/caching-server](https://roadmap.sh/projects/caching-server)

## Contributing

Contributions are welcome! Fork the repo and submit a pull request for improvements.

## License

MIT
