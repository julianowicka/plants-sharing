import { useMemo, useState } from "react";
import { Comment } from "./comment-model";
import { useRouter } from "next/navigation";

interface Props {
    handleAddComment?: ((comment: string) => Promise<void>) | undefined;
    comments?: Comment[] | undefined;
}

export const DisplayComments = (props: Props) => {
    const { handleAddComment, comments = [] } = props;
    const [newComment, setNewComment] = useState("");

    const router = useRouter();

    const onCommentSubmit = async () => {
        if (!newComment.trim() || !handleAddComment) {
            return;
        }
        await handleAddComment(newComment.trim());
        setNewComment("");
        router.refresh();
    };

    const reversedComments = useMemo(() => comments.slice().reverse(), [comments])

    if (!handleAddComment) {
        return null;
    }

    return (
        <div>
            <h2 className="text-sm font-bold font-['Montserrat']">Komentarze</h2>

            <div className="mt-4">
                <label
                    className="block text-sm font-medium mb-2 font-['Montserrat']"
                    htmlFor="newComment"
                >
                    Dodaj komentarz
                </label>
                <textarea
                    id="newComment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                    rows={3}
                    placeholder="Wpisz swój komentarz"
                />
                <button
                    type="button"
                    onClick={onCommentSubmit}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Dodaj
                </button>
            </div>

            <div className="mt-[34px]">
                {reversedComments?.map((comment, index) => (
                    <div key={index} className="mt-[20px]">
                        <p className="text-sm font-bold font-['Montserrat']">
                            {comment.user.name}
                        </p>
                        <p className="mt-[14px] text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                            {comment.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
