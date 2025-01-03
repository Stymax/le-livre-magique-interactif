import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface TaleNavigationProps {
  currentPage: number;
  totalPages: number;
  showMoralPage: boolean;
  onPageChange: (page: number) => void;
}

const TaleNavigation = ({ currentPage, totalPages, showMoralPage, onPageChange }: TaleNavigationProps) => {
  const isLastStoryPage = currentPage === totalPages - 1;
  const isOnMoralPage = showMoralPage;

  return (
    <div className="flex gap-2">
      {currentPage > 0 && !isOnMoralPage && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Retour
        </Button>
      )}
      
      {!isLastStoryPage && !isOnMoralPage && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}

      {isLastStoryPage && !isOnMoralPage && (
        <Button
          onClick={() => onPageChange(totalPages)}
          className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
        >
          Voir la morale
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}

      {isOnMoralPage && (
        <>
          <Button
            onClick={() => onPageChange(totalPages - 1)}
            className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour
          </Button>
          <Button
            onClick={() => onPageChange(0)}
            className="bg-magical-gold/20 hover:bg-magical-gold/40 border-none text-magical-gold font-medium"
          >
            Début
          </Button>
        </>
      )}
    </div>
  );
};

export default TaleNavigation;