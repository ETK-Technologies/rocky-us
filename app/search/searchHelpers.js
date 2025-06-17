export const getTitle = (result) => {
    if (typeof result.title === 'string') return result.title;
    if (result.title?.rendered) return result.title.rendered;
    if (result.name) return result.name;
    if (result.post_title) return result.post_title;
    return '';
};

export const getContentType = (result) => {
    if (result.object_type === 'product' || result.subtype === 'product') return 'Product';
    if (result.object_type === 'post' || result.subtype === 'post') return 'Blog Post';
    if (result.object_type === 'page' || result.subtype === 'page') return 'Page';
    return result.object_type || result.subtype || '';
};

export const getUrl = (result) => {
    return result.url || result.link || result.permalink || '#';
};

export const getImageUrl = (result) => {
    if (result.images && result.images.length > 0) {
        return result.images[0].src;
    }

    if (result.image && result.image.src) {
        return result.image.src;
    }

    if (result.image && typeof result.image === 'string') {
        return result.image;
    }

    if (result._embedded &&
        result._embedded['wp:featuredmedia'] &&
        result._embedded['wp:featuredmedia'][0]) {

        if (result._embedded['wp:featuredmedia'][0].source_url) {
            return result._embedded['wp:featuredmedia'][0].source_url;
        }

        if (result._embedded['wp:featuredmedia'][0].media_details &&
            result._embedded['wp:featuredmedia'][0].media_details.sizes) {
            const sizes = result._embedded['wp:featuredmedia'][0].media_details.sizes;
            if (sizes.medium) return sizes.medium.source_url;
            if (sizes.full) return sizes.full.source_url;
        }
    }

    if (result.featured_image) return result.featured_image;
    if (result.thumbnail) return result.thumbnail;
    if (result.featured_media_url) return result.featured_media_url;

    if (result.acf && result.acf.featured_image) {
        return result.acf.featured_image;
    }

    return null;
};