import React from 'react';
import GitHubButton from 'react-github-btn';

export default function GitHubStarButton() {
    return (
        <GitHubButton
            href="https://github.com/phero-hq/phero"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star phero-hq/phero on GitHub"
        >
            Star
        </GitHubButton>
    );
}
