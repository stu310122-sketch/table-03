import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getElements, ElementData } from './src/data';
import { OrbitalModal } from './src/components/OrbitalModal';
import { ElementModal } from './src/components/ElementModal';
import { QuizView } from './src/components/QuizView';
import { HomeView } from './src/components/HomeView';
import { TableView } from './src/components/TableView';
import { OrbitalsGalleryView } from './src/components/OrbitalsGalleryView';
import { ElementListView } from './src/components/ElementListView';
import { GachaView } from './src/components/GachaView';
import AtomicPackingView from './src/components/AtomicPackingView';
import { NetworkBackground } from './src/components/NetworkBackground';
import { SplashScreen } from './src/components/SplashScreen';
import { AboutView } from './src/components/AboutView';

export default function App() {
    const navigate = useNavigate();
    const [tableMode, setTableMode] = useState('basic'); 
    const [selectedEl, setSelectedEl] = useState<ElementData | null>(null);
    const [selectedOrbital, setSelectedOrbital] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [phaseFilter, setPhaseFilter] = useState<string | number>('all'); 

    const elements = React.useMemo(() => getElements(), []);

    const backToHome = () => navigate('/');

    return (
        <div className="wood-border-container">
            <NetworkBackground />
            <SplashScreen />
            <div className={`wood-border-inner transition-opacity duration-300 opacity-100`}>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/table" element={
                        <TableView 
                            elements={elements}
                            tableMode={tableMode}
                            setTableMode={setTableMode}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            phaseFilter={phaseFilter}
                            setPhaseFilter={setPhaseFilter}
                            onSelectElement={setSelectedEl}
                            onSelectOrbital={setSelectedOrbital}
                            onBack={backToHome}
                        />
                    } />
                    <Route path="/orbitals_gallery" element={
                        <OrbitalsGalleryView 
                            onSelectOrbital={setSelectedOrbital}
                            onBack={backToHome}
                        />
                    } />
                    <Route path="/list" element={
                        <ElementListView 
                            elements={elements}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSelectElement={setSelectedEl}
                            onBack={backToHome}
                        />
                    } />
                    <Route path="/quiz" element={<QuizView elements={elements} onBack={backToHome} />} />
                    <Route path="/stats" element={<AtomicPackingView onBack={backToHome} />} />
                    <Route path="/gacha" element={
                        <GachaView 
                            elements={elements}
                            onDraw={setSelectedEl}
                            onBack={backToHome}
                        />
                    } />
                    <Route path="/about" element={<AboutView onBack={backToHome} />} />
                </Routes>
                {selectedEl && <ElementModal element={selectedEl} onClose={() => setSelectedEl(null)} tableMode={tableMode} />}
                {selectedOrbital && <OrbitalModal type={selectedOrbital} onClose={() => setSelectedOrbital(null)} />}
            </div>
        </div>
    );
}
