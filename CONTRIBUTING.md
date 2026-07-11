# Contributing Guidelines

Thank you for your interest in contributing to the TRC-20 Token project! Please follow these guidelines to ensure a smooth collaboration.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Token.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Workflow

### Setting Up Your Environment

```bash
# Install TronBox globally
npm install -g tronbox

# Install project dependencies
npm install

# Compile contracts
npm run compile
```

### Making Changes

1. Make your changes to the contract or supporting files
2. Follow Solidity best practices and naming conventions
3. Ensure backward compatibility where possible
4. Add tests for new functionality

### Testing

Before submitting a pull request, ensure all tests pass:

```bash
npm run test
```

All tests must pass. Write additional tests to cover:
- Normal use cases
- Edge cases
- Error conditions
- Gas optimization opportunities

## Code Style

### Solidity
- Use Solidity 0.8.x or compatible versions
- Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use clear, descriptive variable and function names
- Add NatSpec comments for public/external functions

### JavaScript
- Use ES6+ features
- Follow consistent indentation (2 spaces)
- Use meaningful variable names
- Add comments for complex logic

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new feature description
fix: Fix bug description
docs: Update documentation
test: Add tests for feature
refactor: Refactor code for clarity
```

## Pull Request Process

1. Update the README.md with any new features or changes
2. Ensure all tests pass: `npm run test`
3. Create a detailed pull request description
4. Link any related issues
5. Request review from maintainers
6. Respond to feedback and make necessary changes

## Reporting Issues

When reporting issues, include:
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Node version, TronBox version)
- Error messages or stack traces

## Security Considerations

- Never commit private keys or sensitive data
- Use environment variables for secrets
- Test contracts thoroughly before deployment
- Consider security implications of changes
- Report security vulnerabilities privately to the maintainers

## Questions?

Open an issue or discussion for questions about the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report unacceptable behavior

Thank you for contributing to making TRC-20 Token better! 🙏
