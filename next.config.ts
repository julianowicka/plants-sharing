import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    turbo: {
      rules: {
        '*.html': {
          loaders: ['raw-loader'],
          as: '*.html'
        }
      }
    }
  },
  webpack: (config, { isServer }) => {
    // Ignore problematic modules
    config.externals = config.externals || [];
    config.externals.push({
      'aws-sdk': 'aws-sdk',
      'mock-aws-s3': 'mock-aws-s3',
      'nock': 'nock'
    });

    // Ignore node-pre-gyp files
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader'
    });

    return config;
  }
};

export default nextConfig;
