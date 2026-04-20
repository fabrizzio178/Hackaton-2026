import { useState, useEffect } from 'react';
import { API_URL } from '../api/config';

export function useLandingData() {
  const [mesa, setMesa] = useState<{ numero: number } | null>(null);
  const [mozo, setMozo] = useState<{ nombre: string, apellido: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/mesas`).then(r => r.json()).catch(() => []),
      fetch(`${API_URL}/mozos`).then(r => r.json()).catch(() => [])
    ]).then(([mesasData, mozosData]) => {
      // Pick active mesa or default
      if (mesasData && mesasData.length > 0) {
        setMesa(mesasData.find((m: any) => m.ocupado) || mesasData[0]);
      }
      // Pick generic mozo
      if (mozosData && mozosData.length > 0) {
        setMozo(mozosData[0]);
      }
      setLoading(false);
    });
  }, []);

  return { mesa, mozo, loading };
}

export function useJuegos() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/juegos`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setJuegos(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { juegos, loading };
}

export function useCartaData() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/productos`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (!Array.isArray(data)) return;
        
        const grouped = data.reduce((acc: any, p: any) => {
          if (!p.categoria) return acc;
          const catId = p.categoria.id;
          if (!acc[catId]) {
            acc[catId] = {
              id: catId,
              name: p.categoria.nombre,
              emoji: p.categoria.emoji,
              items: []
            };
          }
          acc[catId].items.push({
            id: p.idProducto,
            name: p.nombre,
            price: p.precioUnitario,
            description: p.descripcion,
            emoji: p.emoji,
            categoryId: catId
          });
          return acc;
        }, {});

        setCategories(Object.values(grouped));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
