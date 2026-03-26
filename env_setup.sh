#!/bin/bash

export PATH="/Users/dmitryvikulin/.npm-global/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

echo "Workspace: $(pwd)"
rm -rf allure-results
rm -rf playwright-report

npm ci
npx playwright install
npm run "$script"