import type { MDXComponents } from 'mdx/types';

/**
 * Element overrides applied to all MDX post content via <MDXProvider>.
 * Most styling comes from the `prose` typography classes on the wrapper;
 * these overrides add behavior the classes can't: lazy images and safe
 * external links.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }) => (
    <img
      src={typeof src === 'string' ? src : undefined}
      alt={alt ?? ''}
      loading="lazy"
      className="rounded-xl"
      {...props}
    />
  ),
};
