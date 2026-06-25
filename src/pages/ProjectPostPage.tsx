import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { getProject } from '../content/projects';
import { PostLayout } from '../components/layout/PostLayout';
import { mdxComponents } from '../components/mdx/MdxComponents';

export function ProjectPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getProject(slug) : undefined;

  // Start each post at the top, and restore the title on unmount.
  useEffect(() => {
    if (!entry) return;
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = `${entry.meta.title} | Brandon Khadan`;
    return () => {
      document.title = previousTitle;
    };
  }, [entry]);

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  const { Component } = entry;

  return (
    <PostLayout meta={entry.meta}>
      <MDXProvider components={mdxComponents}>
        <Component />
      </MDXProvider>
    </PostLayout>
  );
}
