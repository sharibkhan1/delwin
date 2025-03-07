"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Plus } from "lucide-react";
import IconBackadminButton from "@/components/global/iconadminback";
import DeletePortfolioDialog from "./_comp/deletedialgo";

const PortfolioPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const { id: userIdd } = use(params); // ✅ Unwrap params with React.use()

  const [portfolios, setPortfolios] = useState<{ id: string; name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "retailers", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPortfolios(docSnap.data().portfolios || []);
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, [userId]);

  const createNewPortfolio = async () => {
    const portfolioId = Date.now().toString();
    router.push(`/delwin/${userIdd}/admin/port/${portfolioId}`);
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (!userId) return;

    try {
      const docRef = doc(db, "retailers", userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const existingPortfolios = docSnap.data().portfolios || [];
      const updatedPortfolios = existingPortfolios.filter((p: { id: string; name: string; description: string }) => p.id !== portfolioId);

      await updateDoc(docRef, { portfolios: updatedPortfolios });

      setPortfolios(updatedPortfolios);
      toast.success("Portfolio deleted successfully!");
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast.error("Failed to delete portfolio.");
    }
  };

  return (
    <div className="p-4 space-y-8">
      {/* Top Bar */}
      <div className="w-full h-[100px] absolute top-0 left-0 z-10 bg-secondary shadow-md flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between h-full py-3 px-4">
          <IconBackadminButton />
          <h1 className="text-4xl font-semibold">Manage Portfolios</h1>
          <Button onClick={createNewPortfolio} className="flex items-center gap-2">
            <Plus size={20} /> Create Portfolio
          </Button>
        </div>
      </div>

      {/* Portfolio List */}
      <div className="h-[100px] w-[1px] relative " >

      </div>
      <div className="max-w-7xl relative mx-auto mt-24">
        {loading ? (
          <p>Loading portfolios...</p>
        ) : portfolios.length > 0 ? (
          <div className="space-y-4">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{portfolio.name}</h2>
                  <p>{portfolio.description}</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => router.push(`/delwin/${userIdd}/admin/port/${portfolio.id}`)}>
                    <Pencil size={20} />
                  </Button>
                  <DeletePortfolioDialog onDelete={() => handleDeletePortfolio(portfolio.id)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No portfolios found.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
