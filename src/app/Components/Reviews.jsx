"use client";
import { StarIcon } from "@heroicons/react/24/solid";

export default function Reviews({ data }) {
  

    // Function to render stars based on review count
    const renderStars = (count) => {
        const stars = [];
        const totalStars = 5; // Assuming a maximum of 5 stars for the review rating

        // Render filled stars (yellow)
        for (let i = 0; i < count; i++) {
            stars.push(<StarIcon key={i} className="h-6 w-6 text-yellow" />);
        }

        // Render empty stars (red)
        for (let i = count; i < totalStars; i++) {
            stars.push(<StarIcon key={i} className="h-6 w-6 text-gray-200" />);
        }

        return stars;
    };

    return (
        <ul className="review-list">
            {data &&
                data.map((item, index) => (
                    <li key={index}>
                        <div className="flex justify-between items-center">
                            <small>
                                {item?.review_author} ~ {item?.review_post_date}
                            </small>
                            <div className="flex">
                                {/* Render stars with yellow for filled and red for empty */}
                                {renderStars(item?.review_count)}
                            </div>
                        </div>
                        <p>{item?.review_content}</p>
                    </li>
                ))}
        </ul>
    );
}