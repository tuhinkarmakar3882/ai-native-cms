# Blocks and Components Documentation

This project uses a powerful composition system for building flexible, reusable page layouts. The architecture separates concerns into **Blocks** (page-level layout building components) and **Components** (reusable UI elements).

## Table of Contents

- [Blocks](#blocks)
  - [Premade Blocks](#premade-blocks)
  - [Composable Blocks](#composable-blocks)
- [Components](#components)
  - [UI Components](#ui-components)
  - [Core Components](#core-components)
  - [Design Components](#design-components)
- [Architecture](#architecture)
- [Usage Guide](#usage-guide)

---

## Blocks

Blocks are the building blocks for page layouts, configured in the Payload CMS admin panel. They represent complete, self-contained sections that can be stacked together to create unique page experiences.

### Premade Blocks

Premade blocks are fully designed, ready-to-use sections that require minimal configuration:

#### Hero & Banner Blocks

- **Hero** - Full-width hero section with title, description, and action buttons
- **HeroGradient** - Advanced hero with gradient backgrounds and rich visual effects
- **SplitBanner** - Split-screen banner combining image and content side-by-side

#### Content & Information Blocks

- **FeatureGrid** - Display features in a responsive grid layout with icons and descriptions
- **FeatureTabs** - Tab-based interface for organizing feature sets
- **FAQ** - Accordion-style frequently asked questions section
- **MediaContent** - Flexible content block combining text and media in various layouts
- **ImageGallery** - Responsive image gallery with lightbox functionality

#### Social & Community Blocks

- **Testimonials** - Carousel of customer testimonials with ratings and avatars
- **LogoMarquee** - Scrolling marquee of partner/client logos
- **Timeline** - Chronological timeline for showing events, milestones, or processes

#### Data & Metrics Blocks

- **Metrics** - Display key statistics and metrics in a visually appealing grid
- **Pricing** - Pricing table block for displaying product tiers and plans
- **Table** - Smart table component for structured data display

#### Advanced Blocks

- **BentoGrid** - Magazine-style grid layout with mixed sizes and media
- **RelatedPosts** - Automatically display related blog posts or content
- **ArchiveBlock** - Dynamic listing of posts/pages with filtering and pagination

### Composable Blocks

The **Composable Section** block provides maximum flexibility by allowing editors to build custom layouts using atomic components.

#### Composable Section

Combines small, reusable "atom" components to create custom layouts without developer intervention.

**Available Atom Components:**

- **Button Atom** - Customizable button with variants (primary, outline, secondary, etc.)
- **Badge Atom** - Label/tag badge component
- **Text Atom** - Rich text editor with full formatting capabilities
- **Alert Atom** - Alert boxes with customizable types (info, warning, error, success)
- **Separator Atom** - Visual divider with configurable spacing
- **Progress Atom** - Progress bar with labels and percentages
- **Icon Atom** - Lucide icons with dynamic loading
- **Avatar Atom** - User avatars with fallbacks
- **Accordion Atom** - Collapsible accordion sections
- **Tooltip Atom** - Hover tooltips for additional information

---

## Components

Components are reusable React elements used throughout the application, organized into three main categories:

### UI Components

Located in `/src/components/ui/`, these are styled, primitive UI components from shadcn/ui:

#### Form Components
- `input` - Text, email, password, number inputs
- `textarea` - Multi-line text input
- `checkbox` - Toggle checkbox with label
- `radio-group` - Radio button group
- `select` - Dropdown selection
- `toggle` - Toggle switch button
- `switch` - On/off switch control
- `button` - Interactive button with variants
- `button-group` - Grouped button collection
- `label` - Form label component
- `field` - Wrapper for form fields with validation

#### Display Components
- `card` - Container for content grouping
- `badge` - Label/tag display
- `avatar` - User profile pictures
- `progress` - Progress bar indicator
- `skeleton` - Loading placeholder
- `spinner` - Loading animation
- `empty` - Empty state placeholder

#### Navigation Components
- `pagination` - Page navigation
- `breadcrumb` - Breadcrumb navigation trail
- `navigation-menu` - Main navigation menu
- `sidebar` - Collapsible sidebar navigation
- `tabs` - Tab navigation interface
- `menubar` - Menu bar component

#### Dialog & Overlay Components
- `dialog` - Modal dialog
- `alert-dialog` - Confirmation dialog
- `drawer` - Slide-out drawer
- `dropdown-menu` - Dropdown menu
- `context-menu` - Right-click context menu
- `hover-card` - Hover reveal card
- `popover` - Floating popover panel
- `sheet` - Sheet modal

#### Data Components
- `table` - Styled data table
- `accordion` - Collapsible accordion sections
- `carousel` - Image/content carousel
- `chart` - Data visualization charts

#### Utility Components
- `tooltip` - Hover tooltips
- `separator` - Visual divider
- `scroll-area` - Scrollable container
- `kbd` - Keyboard key display
- `input-group` - Grouped input fields
- `input-otp` - One-time password input
- `command` - Command palette
- `collapsible` - Collapsible container
- `resizable` - Resizable panels
- `slider` - Range slider
- `toggle-group` - Toggle button group
- `aspect-ratio` - Aspect ratio wrapper
- `calendar` - Calendar picker
- `sonner` - Toast notifications

### Core Components

Located in `/src/components/`, these are application-specific components:

#### Layout Components
- **Card** - Content card wrapper
- **Link** - Styled link component
- **Logo** - Site logo component
- **RichText** - Rich text renderer for Lexical editor content
- **Pagination** - Post/page pagination
- **PageRange** - Page range display

#### Content Components
- **Media** - Image/video display with optimization
- **CollectionArchive** - Archive/listing page wrapper
- **PayloadRedirects** - Redirect handling
- **BeforeDashboard** - Admin dashboard customizations
- **BeforeLogin** - Login page customizations
- **LivePreviewListener** - Draft/live preview functionality

#### Design System
- **Designs** - Collection of design-specific component variations

### Design Components

Located in `/src/components/Designs/`, these are pre-built design variations:

- **Hero** - Hero section design
- **FeatureGrid** - Feature grid design
- **FAQ** - FAQ section design
- **MediaContent** - Media content design
- **ImageGallery** - Image gallery design
- **Testimonials** - Testimonials carousel design
- **Pricing** - Pricing table design
- **BentoGrid** - Bento grid layout design
- **FeatureTabs** - Feature tabs design
- **LogoMarquee** - Logo marquee design
- **Timeline** - Timeline design
- **Metrics** - Metrics display design
- **SplitBanner** - Split banner design
- **Table** - Table display design

---

## Architecture

### Design Philosophy

The component architecture follows these principles:

1. **Separation of Concerns**
   - UI Components: Primitive, unstyled-first (shadcn/ui style)
   - Design Components: Styled variations for specific use cases
   - Blocks: Page-level layout composition

2. **Composability**
   - Small components combine into larger components
   - Blocks compose multiple components into page sections
   - Composable Section allows editors to build custom blocks

3. **Reusability**
   - UI components used across multiple design variations
   - Design components provide common layout patterns
   - Blocks enable content editors to leverage components without code

4. **Type Safety**
   - TypeScript throughout the codebase
   - Payload config files define block schema and validation

### Block Rendering

The `RenderBlocks.tsx` component acts as the central dispatcher:

```typescript
// Maps block slugs to component implementations
const blockMap = {
  heroGradient: HeroGradientComponent,
  bentoGrid: BentoGridComponent,
  featureTabs: FeatureTabsComponent,
  // ... other blocks
  composableSection: ComposableSectionComponent,
}

// Renders blocks based on their type
export const RenderBlocks = ({ blocks }) => {
  return blocks.map((block) => {
    const Component = blockMap[block.blockType]
    return <Component key={block.id} {...block} />
  })
}
```

### Configuration

Each block has a corresponding `config.ts` file that defines:
- Block slug (unique identifier)
- Fields (configurable properties in Payload CMS)
- Field validation and constraints
- Default values

Example:
```typescript
// src/blocks/Hero/config.ts
export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'actions',
      type: 'array',
      maxRows: 2,
      fields: [/* action button config */],
    },
  ],
}
```

---

## Usage Guide

### Creating a Page with Blocks

1. **Login to Payload Admin** at `/admin`
2. **Create or Edit a Page/Post**
3. **Add Blocks** using the layout builder:
   - Click "Add Block"
   - Select block type (e.g., "Hero", "FeatureGrid", "FAQ")
   - Fill in the configurable fields
   - Save

### Using Premade Blocks

Premade blocks provide the quickest way to create professional sections:

```typescript
// Hero block example
{
  blockType: 'hero',
  title: 'Welcome to Our Site',
  description: 'Discover amazing features',
  actions: [
    { label: 'Get Started', variant: 'default' },
    { label: 'Learn More', variant: 'outline' }
  ]
}
```

### Using Composable Sections

For custom layouts, use the Composable Section block:

1. Add a "Composable Section" block
2. Configure layout options (columns, spacing, etc.)
3. Add atoms (text, buttons, badges, etc.)
4. Position and configure each atom
5. Save

Example structure:
```typescript
{
  blockType: 'composableSection',
  layout: 'grid',
  columns: 2,
  atoms: [
    { type: 'textAtom', content: 'Your text' },
    { type: 'buttonAtom', label: 'Click Me', variant: 'primary' },
    { type: 'badgeAtom', label: 'New' }
  ]
}
```

### Extending Components

To add a new UI component:

1. Create a new file in `/src/components/ui/[name].tsx`
2. Import shadcn/ui or create custom styled component
3. Export the component
4. Use throughout the application

To add a new block:

1. Create directory `/src/blocks/[BlockName]/`
2. Create `config.ts` with block schema
3. Create `Component.tsx` with React component
4. Export from `Component.tsx`
5. Add to `blockMap` in `RenderBlocks.tsx`
6. Add config to Payload blocks in `payload.config.ts`

### Styling

The project uses:
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built component library
- **CSS Modules** - Optional scoped styling

All components use TailwindCSS classes. Custom styling should follow TailwindCSS conventions.

### Dark Mode

All UI components support dark mode via Tailwind's dark mode utilities:

```typescript
<div className="bg-white dark:bg-slate-900">
  Dark mode compatible content
</div>
```

---

## Best Practices

### When Creating New Components

1. **Start with UI components** - Use shadcn/ui as the base
2. **Create design variants** in `/src/components/Designs/` if needed
3. **Compose into blocks** for page-level usage
4. **Keep components focused** - Single responsibility principle
5. **Use TypeScript** - Define prop interfaces clearly
6. **Support dark mode** - Add dark: classes where appropriate
7. **Make it accessible** - ARIA labels, semantic HTML, keyboard navigation

### When Creating New Blocks

1. **Define schema in config.ts** - Clear field types and validation
2. **Create responsive design** - Mobile-first approach
3. **Use existing components** - Compose rather than recreate
4. **Support draft preview** - Ensure blocks work in preview mode
5. **Document options** - Clear descriptions in Payload CMS
6. **Test with real content** - Seed database to validate

### Performance

- Use Next.js Image optimization for images
- Lazy load components when possible
- Memoize expensive computations
- Use dynamic imports for heavy blocks
- Leverage Payload's caching strategies

---

## Resources

- [Payload CMS Blocks Documentation](https://payloadcms.com/docs/fields/blocks)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TailwindCSS Utility Classes](https://tailwindcss.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [React Best Practices](https://react.dev)

---

## Contributing

When contributing new blocks or components:

1. Follow the existing folder structure
2. Write TypeScript with strict types
3. Include JSDoc comments for complex logic
4. Test in multiple screen sizes
5. Ensure dark mode compatibility
6. Update this documentation
7. Submit PR with clear description

---

## Troubleshooting

### Block not rendering
- Check `blockMap` in `RenderBlocks.tsx`
- Verify config is registered in `payload.config.ts`
- Check browser console for errors
- Ensure block data matches schema

### Component styling issues
- Clear `.next` cache and rebuild
- Check TailwindCSS class conflicts
- Verify dark mode classes are applied
- Test in different browsers

### Performance problems
- Check for missing Image optimization
- Profile with Chrome DevTools
- Review memoization of expensive components
- Check for unnecessary re-renders

