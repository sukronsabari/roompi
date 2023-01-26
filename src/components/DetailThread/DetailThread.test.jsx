/**
 * skenario testing
 *
 * - DetailThread component
 *  - should display title, body, time created, userInfo, and available comments
 *  - should display available tags
 *  - should display a like button, dislike button, and a comment button
 *  - should display a form to create a new comment when already logged in
 */

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import DetailThread from '.';

expect.extend(matchers);

describe('DetailThread component', () => {
  const detailThread = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
    authUser: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  };

  afterEach(() => {
    cleanup();
  });

  it('should display title, body, time created, userInfo, and available comments', () => {
    // arrange
    render(<DetailThread {...detailThread} />);
    const title = screen.getByText(detailThread.title, { selector: 'h2' });
    const body = screen.getByText(detailThread.body);
    const createdAt = screen.getByTestId('detail-createdAt');
    const ownerThreadImage = screen.getByAltText('thread owner image');
    const ownerThreadName = screen.getByTestId('thread owner');
    const comments = screen.getAllByTestId('comment-item');

    // assert
    expect(title).toBeVisible();
    expect(title).toHaveTextContent(detailThread.title);
    expect(body).toBeVisible();
    expect(body).toHaveTextContent(detailThread.body);
    expect(createdAt).toBeVisible();
    expect(createdAt).toHaveTextContent(/ago$/);
    expect(ownerThreadImage).toBeVisible();
    expect(ownerThreadName).toBeVisible();
    expect(ownerThreadName).toHaveTextContent(detailThread.owner.name);
    expect(comments).toHaveLength(1);
  });

  it('should display available tags', () => {
    // arrange
    render(<DetailThread {...detailThread} />);
    const tags = screen.getAllByTestId('tag-item');

    // assert
    expect(tags).toHaveLength(1);
    expect(tags[0]).toBeVisible();
  });

  it('should display a like button, dislike button, and a comment button', () => {
    // arrange
    render(<DetailThread {...detailThread} />);
    const likeThreadButton = screen.getByTitle('like button');
    const dislikeThreadButton = screen.getByTitle('dislike button');
    const commentThreadButton = screen.getByTitle('total comment');

    // assert
    expect(likeThreadButton).toBeVisible();
    expect(likeThreadButton).toHaveAccessibleName('like this thread');
    expect(dislikeThreadButton).toBeVisible();
    expect(dislikeThreadButton).toHaveAccessibleName('dislike this thread');
    expect(commentThreadButton).toBeVisible();
    expect(commentThreadButton).toHaveAccessibleName('total comment');
  });

  it('should display a form to create a new comment when already logged in', () => {
    // arrange
    render(<DetailThread {...detailThread} />);
    const richTextEditorElement = screen.getByTestId('rich-text-editor');

    // assert
    expect(richTextEditorElement).toBeVisible();
  });
});
