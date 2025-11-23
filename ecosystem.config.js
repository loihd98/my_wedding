module.exports = {
  apps: [
    {
      name: "wedding-app",
      script: "server.js",
      cwd: "/home/deploy/my_wedding",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      env_file: "/home/deploy/my_wedding/.env.production",
      error_file: "/home/deploy/logs/wedding-app-error.log",
      out_file: "/home/deploy/logs/wedding-app-out.log",
      log_file: "/home/deploy/logs/wedding-app.log",
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=1024",
    },
  ],
};
