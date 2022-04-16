class EquipmentItem {
    constructor(id, slug, brand, model, thumbnailFilename) {
        this.id = id || null;
        this.slug = slug || null;
        this.brand = brand || {
            no: null,
            en: null
        };
        this.model = model || {
            no: null,
            en: null
        };
        this.thumbnailFilename = thumbnailFilename;
    }
}

export default EquipmentItem;
