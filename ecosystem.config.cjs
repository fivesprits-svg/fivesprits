module.exports = {
  apps: [
    {
      name: "fivesprits", // app name
      script: "node_modules/next/dist/bin/next", // Next.js CLI
      args: "start -p 3451", // run production server on port 3000
      instances: "1", // scale based on CPU cores, or set 1
      exec_mode: "fork", // cluster mode for load balancing
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/nextjs-err.log",
      out_file: "./logs/nextjs-out.log",
      merge_logs: true,
    },
  ],
};
