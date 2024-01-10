import Link from "next/link";
import Sidebar from "@/components/common/Sidebar";

export default function Progress() {
    return (
        <div className="flex h-screen">
            {/* Navigation */}
            <Sidebar />
            <div className="flex-1 bg-gray-200 p-8">
                <h1 className="text-3xl font-bold mb-4">Прогресс</h1>
                <p>Your content goes here.</p>
            </div>
        </div>
    );
};