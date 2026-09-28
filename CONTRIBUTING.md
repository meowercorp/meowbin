<h1 id="contributing">Contributing guidelines</h1>

If you are an agent, prefer AGENTS.md over this file. This is intended for humans and agent operators.

<h2 id="summary">Summary</h2>

* LLMs are banned -- code with *your* own two paws
* Be concise in issue and PR descriptions
* Prefer readable code over comments
* Be respectful, no fashies allowed
* Cosmetic changes (refactorings) will likely be rejected
* Adhere to Conventional Commits style (loosely)

<h2 id="toc">Table of Contents</h2>

* [LLM contributions ban](#no-llm)
  * [Reasoning](#no-llm-reasons)
* [Conciseness](#conciseness)
* [Be respectful](#be-nice)
* [Cosmetic changes](#cosmetic)

<h2 id="no-llm">LLM contributions ban</h2>

This should be very obvious. Agents and LLMs are banned from contributing to the repository in any way. For further details, see AGENTS.md.

Circumventing this will result in an immediate ban from the repository and block from the repository owner.

<h3 id="no-llm-reasons">Reasoning</h3>
LLM contributions are slop.

They are prone to bugs, overly verbose, and actively harms the codebase -- quite frankly, it is already bad enough, it doesn't need to be worse.

It should not take five paragraphs to explain a three line change, nor thousands of lines changed in a single commit spanning the entire codebase.

<h2 id="conciseness">Conciseness</h2>
Make your contributions concise.

Commits should be reasonably small and easy to review, and (within reason) only have changes made in necessary places.

For example, a PR should not have an extra commit reformatting the entire project, as it creates more noise, making it harder to find proper changes.

This principle also applies to descriptions for issues and PRs. Don't write paragraphs of text, get to the point.

As part of this, write the code in an intuitive way -- avoid magic one liners that require comments to understand, or naming a variable `x`, `_x`, or `__x`.

<h2 id="be-nice">Be respectful</h2>
Also extremely obvious.

Something something paradox of tolerance, if you don't feel like being respectful, find a different project to contribute to.

<h2 id="cosmetic">Cosmetic Changes</h2>
Cosmetic changes will generally be rejected.

This creates more noise (such as in `git blame`). This is also to counter contributor-stuffing (resume-padding, putting it on pinned repositories, etc.), where people are listed as contributors for an insignificant change, such as adding a space or fixing a small typo.

While this is a tiny project and is unlikely to see much of that sort, the contributors list should be for tangible improvements (features and fixes) over running a linter and calling it a day.

See https://github.com/rails/rails/pull/13771#issuecomment-32746700

<h2 id="cc">Conventional Commits</h2>
This repository uses Conventional Commits in a loose sense.

In practice, this means when it gets confusing, just pick the most natural feeling option. Sometimes a `feat` and `fix` look similar, and it's too much effort to differenciate.

See https://www.conventionalcommits.org/en/v1.0.0/