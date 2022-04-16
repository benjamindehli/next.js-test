// Helpers
import { convertToUrlFriendlyString } from "helpers/urlHelpers";

// Data
import posts from "data/posts/data/all.json";
import amplifiers from "data/equipment/data/amplifiers.json";
import effects from "data/equipment/data/effects.json";

const AddJsonData = (props) => {
    const handleAddPosts = async () => {
        const convertedPosts = posts.map((post) => {
            return {
                content: post.content,
                copyright: post.copyright,
                link: post.link,
                orderNumber: post.orderNumber,
                thumbnailDescription: post.thumbnailDescription,
                thumbnailFilename: post.thumbnailFilename,
                timestamp: post.timestamp,
                title: post.title,
                slug: {
                    no: convertToUrlFriendlyString(post.title.no),
                    en: convertToUrlFriendlyString(post.title.en)
                }
            };
        });

        console.log("convertedPosts", convertedPosts.slice(0, 10));
        const tenFirstConvertedPosts = convertedPosts.slice(0, 10);

        const fetchUrl = "/api/addJsonData/posts";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(tenFirstConvertedPosts),
            headers: {
                "Content-Type": "application/json"
            }
        };
        await fetch(fetchUrl, fetchOptions);
    };

    const handleAddAmplifiers = async () => {
        const convertedAmplifiers = amplifiers.map((amplifier) => {
            return {
                brand: amplifier.brand,
                model: amplifier.model,
                thumbnailFilename: convertToUrlFriendlyString(`${amplifier.brand} ${amplifier.model}`),
                slug: convertToUrlFriendlyString(`${amplifier.brand} ${amplifier.model}`)
            };
        });

        const tenFirstConvertedAmplifiers = convertedAmplifiers.slice(0, 10);

        const fetchUrl = "/api/addJsonData/amplifiers";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(tenFirstConvertedAmplifiers),
            headers: {
                "Content-Type": "application/json"
            }
        };
        await fetch(fetchUrl, fetchOptions);
    };

    const handleAddEffects = async () => {
        const convertedEffects = effects.map((effectsItem) => {
            return {
                brand: effectsItem.brand,
                model: effectsItem.model,
                thumbnailFilename: convertToUrlFriendlyString(`${effectsItem.brand} ${effectsItem.model}`),
                slug: convertToUrlFriendlyString(`${effectsItem.brand} ${effectsItem.model}`)
            };
        });

        const tenFirstConvertedEffects = convertedEffects.slice(0, 10);

        const fetchUrl = "/api/addJsonData/effects";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(tenFirstConvertedEffects),
            headers: {
                "Content-Type": "application/json"
            }
        };
        await fetch(fetchUrl, fetchOptions);
    };

    return (
        <div>
            <h1>Add JSON data</h1>
            <button onClick={handleAddPosts}>Add posts from json</button>
            <button onClick={handleAddAmplifiers}>Add amplifiers from json</button>
            <button onClick={handleAddEffects}>Add effects from json</button>
        </div>
    );
};

export default AddJsonData;
