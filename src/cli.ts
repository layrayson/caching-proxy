#!/usr/bin/env node
// The shebang above tells the OS to run this file with Node.js

// src/cli.ts

/**
 * Parse command line arguments
 * Looks for --key value pairs
 * Example: --port 3000 --origin http://dummyjson.com
 */
export function parseArgs(): { [key: string]: string } {
  const args: { [key: string]: string } = {};
  const argv = process.argv.slice(2); // Remove 'node' and script path

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    // Check if it's a flag (starts with --)
    if (arg.startsWith("--")) {
      const key = arg.slice(2); // Remove '--'
      const value = argv[i + 1]; // Get next value

      if (value && !value.startsWith("--")) {
        args[key] = value;
        i++; // Skip next item since we used it as value
      } else {
        // Flag without value (like --help)
        args[key] = "true";
      }
    }
  }

  return args;
}

/**
 * Display help message
 */
function showHelp(): void {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║          Caching Proxy Server - CLI Tool                  ║
╚════════════════════════════════════════════════════════════╝

USAGE:
  caching-proxy --port <number> --origin <url> [options]

REQUIRED OPTIONS:
  --port <number>      Port number for the proxy server
  --origin <url>       Origin server URL to proxy requests to

OPTIONAL:
  --ttl <seconds>      Cache TTL in seconds (default: 300)
  --help               Show this help message

EXAMPLES:
  caching-proxy --port 3000 --origin http://dummyjson.com
  caching-proxy --port 8080 --origin https://jsonplaceholder.typicode.com
  caching-proxy --port 3000 --origin http://dummyjson.com --ttl 600

CACHE MANAGEMENT:
  GET  /cache/stats    View cache statistics
  POST /cache/clear    Clear all cached data

TESTING:
  # First request (cache miss)
  curl -i http://localhost:3000/products/1

  # Second request (cache hit - faster!)
  curl -i http://localhost:3000/products/1

  # Check cache
  curl http://localhost:3000/cache/stats

For more info: https://roadmap.sh/projects/caching-server
`);
}

/**
 * Validate required arguments
 */
export function validateArgs(args: { [key: string]: string }): {
  valid: boolean;
  error?: string;
} {
  if (!args.port) {
    return {
      valid: false,
      error: "❌ Missing required argument: --port",
    };
  }

  if (!args.origin) {
    return {
      valid: false,
      error: "❌ Missing required argument: --origin",
    };
  }

  const port = parseInt(args.port);
  if (isNaN(port) || port < 1 || port > 65535) {
    return {
      valid: false,
      error: `❌ Invalid port number: ${args.port}. Must be between 1 and 65535`,
    };
  }

  // Basic URL validation
  try {
    new URL(args.origin);
  } catch {
    return {
      valid: false,
      error: `❌ Invalid origin URL: ${args.origin}`,
    };
  }

  return { valid: true };
}
